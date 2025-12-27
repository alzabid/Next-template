import React, { use } from "react";

export default function dynamicPage({ params }) {
  // console.log(params)
  const { id } = use(params);
  return (
    <div>
      ProductId:{id}
      <h1>dynamic page</h1>
    </div>
  );
}
