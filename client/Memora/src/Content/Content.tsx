import React from "react";



export interface Contenttype {
    title : string,
    subtitle ?: string,
    type : "twitter"|"link"|"document"|"video"|"tags",
    image ?: string,
    content?: string,
    tags : string[],
    date ?: string,
    delete ():void
}

const svg_links = {
   "twitter":"M6 18 18 6M6 6l12 12",
   "link":"m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13",
   "document":"M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
   "video":"m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z",
   "tags":"M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
}

export default function Content(props : Contenttype){

    return (
        <div className="w-60 h-80 rounded-lg border-1 border-gray-600 shadow">
            <div className="flex gap-1 mt-3 pl-3 text-black hover:cursor-default">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d={svg_links[props.type]}/>
                    </svg>
                </div>
                <p className="text-lg font-normal mt-[-5px]">{props.title}</p>
                <div className="ml-9 mt-[-4px] text-gray-500 hover:bg-black/15 rounded-md p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </div>
            </div>   
            {props.subtitle ? 
            (
                <div className="ml-3 font-bold text-2xl text-black mt-2 hover:cursor-default">
                    <p>{props.subtitle}</p>
                </div>):
                (
                    <div>
                    </div>
                )
            }
            {/*Content will be loaded here*/}
            <div className="hover:cursor-default">
                {props.image ? (
                    <div>
                        <div className="bg-gray-500 w-53 h-30 ml-3 mt-5 rounded-lg">
                            <img src={props.image} alt=""/>
                        </div>  
                    </div>
                ):
                (
                    <div className="ml-6 mt-5 w-49">
                        <li className="text-black" key={props.title}>{props.content}</li>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-1 ml-3 w-53 mt-2">
                {props.tags.map(tag=><div className="bg-purple-500/15 text-purple-500 rounded-3xl pl-1 pr-1 text-sm hover:cursor-default">#{tag}</div>)}
            </div>
        </div>
    )
}

