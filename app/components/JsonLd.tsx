/**
 * Renders a schema.org graph as a JSON-LD script tag.
 *
 * Server component: the markup must be in the initial HTML, since the crawlers
 * and answer engines that read structured data do not execute JavaScript.
 */
const JsonLd = ({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) => (
   <script
      type="application/ld+json"
      // JSON.stringify output is not user input and contains no closing tags.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
   />
);

export default JsonLd;
