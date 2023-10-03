import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
    return (
        <footer className="mt-auto flex justify-center p-2">
            <p className="flex items-center">xamdel 2023 <a href="https://github.com/xamdel/clock-in" className="text-lg ml-2"><AiFillGithub /></a></p>
        </footer>
    );
}