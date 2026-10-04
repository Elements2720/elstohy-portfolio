'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="public-error"><h1>BACK IN A MOMENT.</h1><p>Content could not be loaded. Please try again.</p><button className="pill" onClick={reset}>TRY AGAIN</button></main>;}
