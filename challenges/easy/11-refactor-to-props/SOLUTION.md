# Solution: Refactor to Props

## Approach

Extract interface UserCardProps; parent maps users to cards.

## Key concepts

- **Presentational components**: UI-only; easier to test and reuse.
- **Container pattern**: Parent owns data fetching/state.

## Solution code

```tsx
type UserCardProps = {
  name: string;
  avatarUrl: string;
  role: string;
  onFollow?: () => void;
};

export function UserCard({ name, avatarUrl, role, onFollow }: UserCardProps) {
  return (
    <div className="user-card">
      <img src={avatarUrl} alt="" />
      <h3>{name}</h3>
      <p>{role}</p>
      {onFollow && <button onClick={onFollow}>Follow</button>}
    </div>
  );
}

export function UserGallery() {
  const users = [
    { id: '1', name: 'Jane', avatarUrl: '/jane.png', role: 'Engineer' },
    { id: '2', name: 'John', avatarUrl: '/john.png', role: 'Designer' },
  ];
  return users.map((u) => (
    <UserCard key={u.id} {...u} onFollow={() => alert(`Followed ${u.name}`)} />
  ));
}
```

## Walkthrough

UserCard becomes pure function of props. Gallery owns the list and wires events.

## Common mistakes

- Leaving hidden global user
- Spreading id into DOM unintentionally

## Stretch goals

- TypeScript discriminated union for roles
- Skeleton loading prop
