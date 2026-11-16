type Props = {
    id: string;
    title: string;
    children: React.ReactNode;
};

export default function PageSection({ id, title, children }: Props) {
    return (
        <section
            id={id}
            className="scroll-mt-20 border-b border-border last:border-b-0"
        >
            <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {title}
                </h2>
                <div className="mt-4 max-w-2xl text-base text-muted-foreground">
                    {children}
                </div>
            </div>
        </section>
    );
}
