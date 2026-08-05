// app/(auth)/layout.tsx
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main id="root" className="auth-layout">
            {children}
        </main>
    );
}
