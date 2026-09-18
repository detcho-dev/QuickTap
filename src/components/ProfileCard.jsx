export default function ProfileCard({ name, bio, avatar }) {
  return (
    <div className="card">
      {avatar && <img src={avatar} alt={name} className="card-avatar" />}
      <h1 className="card-name">{name}</h1>
      {bio && <p className="card-bio">{bio}</p>}
    </div>
  );
}
