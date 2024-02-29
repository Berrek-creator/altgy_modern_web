import { useRouteError, Link } from "react-router-dom";

import './error-page.css';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Упс!</h1>
      <p>Случилось что то очень плохое!</p>
      <p>
        <i>{error.statusText || error.message}</i>
        <p><b><Link to={'/'}>Домой</Link></b></p>
      </p>
    </div>
  );
}