

export default function UserprofilePage({params}: any ){
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to the profile 
        {params.id}
        </h1>
    </div>
  );
}