import type { HandleDocumentRequestFunction } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

const handleRequest: HandleDocumentRequestFunction = (request, responseStatusCode, responseHeaders, context) => {
  const markup = renderToString(<RemixServer context={context} url={request.url} />);

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
};

export default handleRequest;
