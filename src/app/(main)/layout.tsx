// app/(main)/layout.tsx
import Header from "@/components/shared/Header";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main id="root">
            <Header />
            {children}
        </main>
    );
}
