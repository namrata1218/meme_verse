import Link from "next/link";


export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl block text-white font-bold">Meme Platform </h1>
      <div className="space-x-4 ">
        <Link href="/">Home</Link>
        <Link href="/memes">Explorer</Link>
        <Link href="/upload">Upload</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/profile">Profile </Link>
      
      </div>
    </nav>
  );
}
