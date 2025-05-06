export default function RegisterPage() {
  return (
    <form>
      <label htmlFor="name-input">Name</label>
      <input type="text" id="name-input"></input> <br />
      <label htmlFor="last-name-input">Last name</label>
      <input type="text" id="last-name-input"></input> <br />
      <label htmlFor="email-input">Email</label>
      <input type="email" id="email-input"></input> <br />
      <label htmlFor="password-input">Password</label>
      <input type="password" id="password-input"></input> <br />
      <button type="submit">Submit</button>
    </form>
  );
}
