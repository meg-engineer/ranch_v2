import Head from "next/head";

import { useState, useRef, useEffect } from "react";
import { GetStaticProps } from "next";
import { getAllPost } from "../lib";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Menu from "../components/menu";

export default function Home(props: any) {
  const data = props.data;
  const [current, setCurrent] = useState(0);
  const buttons = useRef(null);

  useEffect(() => {
    updateButtons(current);
    if (process.browser) {
      gsap.registerPlugin(ScrollTrigger);
      setAnimation(current);
    }
  }, [current]);

  function updateButtons(current: number) {
    Object.entries(buttons.current!["children"]).forEach((child, index) => {
      const node: any = child[1];
      if (current === index) {
        node.style.backgroundColor = "white";
        return;
      }
      node.style.backgroundColor = "black";
    });
  }

  function onClick(e: any) {
    const command = e.target.id;
    if (command === "prev") {
      setCurrent((current + 3) % 4);

      return;
    }
    setCurrent((current + 1) % 4);
  }

  function setAnimation(current: number) {
    gsap.from("#wrapper", {
      backgroundColor: "white",
      duration: 2,
      opacity: 1,
    });
  }

  return (
    <div id="wrapper">
      <div className="container">
        <Head>
          <title>recpar_ranch</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <nav className="navbar pt-5">
          <h5>recpar ranch</h5>
          <Menu />
        </nav>
        <main className="d-flex flex-column justify-content-end pb-5">
          <h1 className="display-2">{data[current].title}</h1>
          <p className="h2">{data[current].username}</p>
        </main>

        <footer className="d-flex justify-content-center">
          <div ref={buttons} className="col-md-1 d-flex">
            <i className="mr-5" />
            <i className="mr-5" />
            <i className="mr-5" />
            <i className="mr-5" />
          </div>
          <button onClick={onClick}>Click</button>
        </footer>
      </div>
      <style jsx>
        {`
          #wrapper {
            background: url(${data[current].image}) no-repeat center center
              fixed;
            background-size: cover;
            background-color: rgba(255, 255, 255, 0.2);
            background-blend-mode: lighten;
          }
          .container {
            height: 100vh;
          }
          main {
            height: 80vh;
          }
          button {
            border: none;
            background: none;
          }
          i {
            border: none;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            padding: 5px;
            margin: 10px;
          }
        `}
      </style>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getAllPost();
  const data = posts.map((post) => {
    const username = post.user.name;
    const title = post.name;
    const url = post.noteUrl;
    const image = post.eyecatch;
    return { username, title, url, image };
  });
  return {
    props: { data },
  };
};
