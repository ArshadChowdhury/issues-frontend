import CreateIssueModal from "../components/CreateIssueModal";

interface Post {
  id: number;
  title: string;
  description: string;
}

export default async function Issues() {
  const data = await fetch("http://localhost:3001/issues");
  const issues = await data.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:px-20 sm:py-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl">All Issues</h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {/* Mapping through issues array */}
          {issues.map((post: Post, index: number) => (
            <li key={post.id || index} className="mb-4 text-xl">
              <strong>{post.title}</strong>: {post.description}
            </li>
          ))}
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <CreateIssueModal />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>
          Created with love by{" "}
          <a
            className="text-gray-300 hover:text-gray-50 underline"
            href="https://github.com/ArshadChowdhury"
            target="_blank"
          >
            Arshad Chowdhury
          </a>
        </p>
      </footer>
    </div>
  );
}
