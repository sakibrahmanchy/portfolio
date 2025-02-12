export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Sakibur Rahaman",
          jobTitle: "Senior Software Engineer",
          url: "https://sakibur.com",
          sameAs: [
            "https://github.com/sakibrahmanchy",
            "https://linkedin.com/in/sakibur-rahaman-chowdhury-77359b132"
          ],
          worksFor: {
            "@type": "Organization",
            name: "Turing.com"
          },
          knowsAbout: [
            "Full Stack Development",
            "Cloud Architecture",
            "React",
            "Node.js",
            "TypeScript",
            "AWS",
            "Kubernetes",
            "Microservices"
          ]
        })
      }}
    />
  )
} 