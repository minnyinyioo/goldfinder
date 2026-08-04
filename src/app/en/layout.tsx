import type {Metadata} from "next";import EnglishLang from "@/components/EnglishLang";
export const metadata:Metadata={title:{default:"Goldfinder — Evidence-led field geology",template:"%s | Goldfinder"},description:"A field-oriented knowledge base for gold geology, mineral recognition, representative sampling, and defensible interpretation.",alternates:{languages:{'zh-CN':'/','en':'/en'}}};
export default function EnglishLayout({children}:{children:React.ReactNode}){return <><EnglishLang/>{children}</>}
