type PropsType = {
  children: React.ReactNode;
};

const UserAccount = ({ children }: PropsType) => {
  return (
    <section className="user__account section container">
      <h2 className="section__title">your account</h2>
      <div className="user__account-content">{children}</div>
    </section>
  );
};

export default UserAccount;
