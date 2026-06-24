interface ErrorStateProps {
  title?: string;
  description?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We could not load this content right now. Please check that your Strapi backend is running and try again.",
}: ErrorStateProps) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-16 text-center">
      <h3 className="text-xl font-semibold text-red-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-700">
        {description}
      </p>
    </div>
  );
}
