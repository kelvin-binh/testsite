'use client'

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  
  const handleContextmenu = (e:any) => {
    console.log("handleContextmenu")
    e.preventDefault();
  };
  
  const tmp = useRef<HTMLIFrameElement>(null)
  const onInitPage = useCallback(() => {
    
    const frame = tmp.current;
   console.log("test", frame?.ownerDocument)
    function loadHandler() {
      console.log("loadHandler",frame?.contentDocument)

      frame?.ownerDocument?.addEventListener('click', e => {
        console.log('clicked', e.target);
      });
    }
    frame?.addEventListener('load', loadHandler);
    window.oncontextmenu = handleContextmenu
    // window.addEventListener("click", handleContextmenu,true);
    // window.addEventListener("contextmenu", handleContextmenu,true);
    return () => frame?.removeEventListener('load', loadHandler);
    frame?.addEventListener("contextmenu", handleContextmenu,true);
    // const layout = document.getElementById('layout')?.getRootNode()
    //layout.addEventListener('click', handleContextmenu, true);
    // console.log(layout)
    // layout.postMessage(event);
    // return function cleanup() {
    //   layout.removeEventListener("contextmenu", handleContextmenu);
    // };
  }, []);

  useEffect(() => {
    onInitPage();
  }, [onInitPage]);
  return (
    <main className={styles.main}>
      <iframe
        id="layout"
        src="https://360vr.com.vn/projects/ngoc-dinh-18"
        width={"100%"}
        height={"100%"}
        ref={tmp}
      ></iframe>
    </main>
  );
}
