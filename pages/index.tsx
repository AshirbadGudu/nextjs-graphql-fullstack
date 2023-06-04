import type { NextPage } from "next";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const SEND_EMAIL = gql`
  mutation sendEmail($to: String!, $html: String!) {
    sendEmail(html: $html, to: $to) {
      ... on SuccessResponse {
        message
      }
      ... on FailureResponse {
        error {
          message
          code
        }
      }
    }
  }
`;

const Home: NextPage = () => {
  const [sendEmail, { loading }] = useMutation(SEND_EMAIL);
  const [to, setTo] = useState("");
  const [htmlStr, setHtml] = useState("");
  return (
    <div className="grid place-content-center h-screen">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await sendEmail({ variables: { to, html: htmlStr } });
          if (res?.data?.sendEmail?.error)
            return console.log(res?.data?.sendEmail?.error?.message);
          console.log(res?.data?.sendEmail?.message);
        }}
        className="grid gap-3 shadow-lg p-4 rounded border border-emerald-100"
      >
        <h4>Enter Details To Test Mail</h4>
        <input
          type="email"
          className="border shadow p-2 rounded"
          placeholder="Enter Email Address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <textarea
          className="border shadow p-2 rounded"
          placeholder="Enter Email Body"
          value={htmlStr}
          onChange={(e) => setHtml(e.target.value)}
        ></textarea>
        <button
          className={`border shadow p-2 rounded transition hover:bg-emerald-50 hover:scale-105 ${
            loading ? "bg-gray-50" : ""
          }`}
          type="submit"
        >
          {loading ? `Please Wait` : `Send Email`}
        </button>
      </form>
    </div>
  );
};

export default Home;
