import type { PropsWithChildren } from "react";
import type { HTMLAttributes } from "react";
import "./CardGroup.css";

interface CardGroupProps {
  type: "article" | "section" | "div";
}

export const CardGroup = ({type = 'div', children}: PropsWithChildren<CardGroupProps>) => {
  const Wrapper = (props: PropsWithChildren<HTMLAttributes<HTMLElement>>) => {
    if (type === 'article') return <article {...props} />;
    if (type === 'section') return <section {...props} />;
    return <div {...props} />;
  };

  return <Wrapper className="mijninkomen-cardgroup">{children}</Wrapper>
};
