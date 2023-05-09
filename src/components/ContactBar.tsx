import { LinkedInIcon, GithubIcon, GmailIcon } from "./Icons";
import { Link } from "react-router-dom";
const icons = [
        {
            icon: <GithubIcon className=""/>,
            link: 'https://github.com/IdoBand',
            className: 'ml-4 mr-2',
            },
        {
            icon: <LinkedInIcon className="" />,
            link: 'https://www.linkedin.com/in/ido-band/',
            className: 'mx-2',
        },
        {
            icon: <GmailIcon className="hover:text-blue-500" />,
            link: 'mailto:ido.bandd@gmail.com',
            className: 'mx-2',
        },
        {
            icon: 'Portfolio',
            link: 'https://idoband.onrender.com/',
            className: 'hover:text-blue-500',
        },
    ]
const ContactBar = () => {
  return (
    <main className="flex pl-10 py-1 text-xs">
        Created by Ido Band
        {icons.map((icon,idx) => {
            return (
                <Link to={icon.link} target="_blank" key={idx} className={`w-4 ${icon.className}`}>
                    {icon.icon}
                </Link>
            )
        })}
    </main>
  )
}

export default ContactBar