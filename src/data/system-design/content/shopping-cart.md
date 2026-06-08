# E-commerce Cart & Checkout

## Problem Statement

Design a shopping cart and checkout flow for a React storefront that:

- **Cart:** Add/update/remove items, persist for guests (localStorage) and logged-in users (server merge)
- **Inventory:** Detect out-of-stock before payment; handle race when last item sells
- **UX:** Optimistic add-to-cart, mini-cart drawer, multi-step checkout wizard
- **Payments:** Stripe Elements—card data never touches your React state or server logs
- **Security:** Idempotent checkout, CSRF on cart mutations, price validated server-side

## System Architecture

- **Client Layer:** Cart context + React Query, checkout step reducer, Stripe.js Elements mount
- **API Layer:** `GET/PATCH /cart`, `POST /checkout/session`, inventory reservation TTL
- **Data Layer:** Cart rows per user/session, product catalog, orders, payment intents

```text
Add to cart ──► optimistic PATCH ──► server validates price/stock
Checkout    ──► POST /checkout/session ──► Stripe PaymentIntent
Success     ──► webhook confirms ──► clear cart + order receipt
```

## Key Technical Decisions

### 1. Guest vs. authenticated cart merge

Guest cart lives in `localStorage` `{ items: [{ productId, qty }] }`. On login:

1. POST guest cart to `/cart/merge`
2. Server merges quantities, resolves conflicts (keep higher qty or server wins)
3. Clear local guest cart

Use stable `sessionId` cookie for anonymous server-side cart if you need cross-device guest sync.

### 2. Optimistic add-to-cart

Update UI immediately; rollback if API returns 409 (out of stock) or 422 (max qty). Show toast: “Only 2 left in stock.”

Never trust client-computed totals—display server `cart.summary` after each mutation.

### 3. Checkout state machine

Steps: `cart → shipping → payment → confirmation`. Use `useReducer` or URL steps (`/checkout/shipping`). Persist shipping draft in sessionStorage so refresh does not lose address.

### 4. Payment boundary (Stripe)

Load `@stripe/stripe-js` + `@stripe/react-stripe-js`. Mount `<PaymentElement />` inside `<Elements stripe={stripePromise} options={{ clientSecret }}>`. Client secret from `POST /checkout/create-payment-intent`—short-lived, single-use.

## Implementation: Core Components

### Cart hook with optimistic updates

```tsx
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type CartItem = { productId: string; title: string; qty: number; unitPrice: number };
type Cart = { items: CartItem[]; subtotal: number };

export function useCart() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetch('/api/cart');
      if (!res.ok) throw new Error('Cart load failed');
      return res.json() as Promise<Cart>;
    },
  });

  const addItem = useMutation({
    mutationFn: (productId: string) =>
      fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, qty: 1 }),
      }),
    onMutate: async (productId) => {
      await qc.cancelQueries({ queryKey: ['cart'] });
      const prev = qc.getQueryData<Cart>(['cart']);
      qc.setQueryData<Cart>(['cart'], (old) => optimisticAdd(old, productId));
      return { prev };
    },
    onError: (_e, _id, ctx) => qc.setQueryData(['cart'], ctx?.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  });

  return { cart: query.data, addItem, isLoading: query.isLoading };
}
```

### Checkout wizard reducer

```tsx
import { useReducer } from 'react';

type Step = 'shipping' | 'payment' | 'review';
type CheckoutState = {
  step: Step;
  address: { line1: string; city: string; zip: string } | null;
  clientSecret: string | null;
};

type Action =
  | { type: 'SET_ADDRESS'; address: CheckoutState['address'] }
  | { type: 'NEXT' }
  | { type: 'BACK' };

function reducer(state: CheckoutState, action: Action): CheckoutState {
  switch (action.type) {
    case 'SET_ADDRESS':
      return { ...state, address: action.address };
    case 'NEXT':
      return {
        ...state,
        step: state.step === 'shipping' ? 'payment' : 'review',
      };
    case 'BACK':
      return {
        ...state,
        step: state.step === 'review' ? 'payment' : 'shipping',
      };
    default:
      return state;
  }
}

export function CheckoutWizard() {
  const [state, dispatch] = useReducer(reducer, {
    step: 'shipping',
    address: null,
    clientSecret: null,
  });

  return (
    <div>
      {state.step === 'shipping' && (
        <ShippingForm
          onSubmit={(address) => {
            dispatch({ type: 'SET_ADDRESS', address });
            dispatch({ type: 'NEXT' });
          }}
        />
      )}
      {state.step === 'payment' && state.clientSecret && (
        <StripePaymentForm clientSecret={state.clientSecret} />
      )}
    </div>
  );
}
```

### Stripe PaymentElement

```tsx
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PayButton() {
  const stripe = useStripe();
  const elements = useElements();
  const [pending, setPending] = useState(false);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setPending(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/checkout/success` },
    });
    if (error) alert(error.message);
    setPending(false);
  }

  return (
    <form onSubmit={handlePay}>
      <PaymentElement />
      <button disabled={!stripe || pending}>Pay now</button>
    </form>
  );
}

export function StripePaymentForm({ clientSecret }: { clientSecret: string }) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PayButton />
    </Elements>
  );
}
```

## Performance Optimization

- Prefetch cart on app load for logged-in users
- Debounce qty spinner changes (300ms) before PATCH
- Lazy-load Stripe.js only on payment step
- Mini-cart: render portal drawer; avoid re-rendering product grid

## Edge Cases and Error Handling

- **Stale price:** Server returns updated line prices; show “Prices updated” banner
- **Inventory race:** 409 on checkout → remove line item + notify user
- **Double submit:** Disable pay button while `confirmPayment` in flight
- **Abandoned cart:** Email reminder via server job—not client concern
- **Guest checkout:** Collect email on shipping step for receipt

## Interview Talking Points

- Why Stripe Elements vs. raw card inputs (PCI scope)
- Idempotency-Key header on checkout POST for retry safety
- Contrast optimistic cart with pessimistic inventory hold at payment step
