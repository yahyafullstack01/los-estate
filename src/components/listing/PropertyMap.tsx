export function PropertyMap({
  query,
  title,
}: {
  query: string;
  title: string;
}) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div className="mt-3 flex-1 overflow-hidden rounded-xl border border-border">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-72 w-full border-0"
      />
    </div>
  );
}
