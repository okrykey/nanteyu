"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

const example_text = `#### 『はちゃめちゃ』は英語ではこのように表現します。 
- #### **chaotic**
### "chaotic"の意味と使い方
"chaotic"は「混沌とした」という意味で、何かが整理されておらず、混乱している状態を表します。この言葉は、状況や物事が乱雑で予測不可能な場合に使用されます。

類義語：**disorderly**, **messy**, **confused**

### "chaotic"を用いた日常生活で使える英語のフレーズ 
- **My room is so chaotic right now.**
(今、私の部屋はとても乱雑です。) 
- **The traffic was chaotic this morning due to the accident.**
(事故のため、今朝の交通は混乱していました。) `;

const example_text2 = `#### 『眉唾もの』はスペイン語でこのように表現されます。
 - #### **sospechoso**
 ###  "Sospechoso" の意味とは？
"Sospechoso"は「疑わしい」という意味です。この言葉は、疑わしいものや信じがたいものを表現する際にスペイン語でよく使われます。

類義語: **Dudoso**, **Cuestionable**, **Poco creíble**

### "Sospechoso" を用いた日常生活で使えるフレーズ
- **Esa historia es sospechosa.** (その話は疑わしい。)
- **El comportamiento del sospechoso era extraño.** (疑わしい人の行動は奇妙だった。)`;

const Examples = () => {
  return (
    <div className="border p-4 rounded-lg">
      <p className="text-lg text-gray-600 pb-2">Example</p>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            『はちゃめちゃ』は英語でなんていう？
          </AccordionTrigger>
          <AccordionContent>
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}
              components={{
                p: ({ children }) => <p className="mb-4 text-sm">{children}</p>,
              }}
              className="markdown"
            >
              {example_text}
            </ReactMarkdown>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            『眉唾もの』はスペイン語でなんていう？
          </AccordionTrigger>
          <AccordionContent>
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}
              components={{
                p: ({ children }) => <p className="mb-4 text-sm">{children}</p>,
              }}
              className="markdown"
            >
              {example_text2}
            </ReactMarkdown>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Examples;
