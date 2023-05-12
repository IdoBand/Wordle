import { flexCenter } from "../_mixin"
import { ReactIcon, TypeScriptIcon, ViteIcon, UbuntuIcon, AWSIcon, NodeJSIcon, ExpressIcon, PostreSQLIcon } from "./Icons"
const aboutHeader = `${flexCenter}  w-full text-3xl my-3`
const aboutText = `flex items-center w-full lg:text-xs flex-wrap`
const About = () => {
  return (
    <main className={`flex justify-start flex-col w-full`}>
      <h1 className={`${aboutHeader}`}>
        Frontend
      </h1>
      <pre className={`${aboutText}`}><ReactIcon className={``} /> - React</pre>
      <pre className={`${aboutText}`}><ViteIcon className={``} /> - Vite</pre>
      <pre className={`${aboutText}`}><TypeScriptIcon className={``} /> - TypeScript</pre>
      <h1 className={`${aboutHeader}`}>
        Backend
      </h1>
      <pre className={`${aboutText}`}><AWSIcon className={``} /> - Amazon Web Services, EC2 Ubuntu</pre>
      <pre className={`${aboutText}`}><NodeJSIcon className={``} /> - Node.JS</pre>
      <pre className={`${aboutText}`}><ExpressIcon className={``} /> - Express</pre>
      <h1 className={`${aboutHeader}`}>
        Database
      </h1>
      <pre className={`${aboutText}`}><PostreSQLIcon className={``} /> - PostreSQL</pre>
    </main>
  )
}

export default About