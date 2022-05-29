import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [suggestionInput, setTextInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ suggestion: suggestionInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setTextInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Experimental</title>
      </Head>

      <main className={styles.main}>
        <img src="/meme.jpeg" className={styles.icon} />
        <h3>AI Text Magician</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="suggestion"
            placeholder="Enter a suggestion or any text stuff here!"
            value={suggestionInput}
            onChange={(e) => setTextInput(e.target.value)}
            autoComplete="off"
          />
          <input type="submit" value="Let's Go!" />
        </form>
        <pre className={styles.result}>{result}</pre>
      </main>
    </div>
  );
}
