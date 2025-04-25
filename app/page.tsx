import { Database } from "@/supabase";
import { createClient } from "@supabase/supabase-js";

export default async function Home() {
  const supabase =  createClient<Database>(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);
  
  const { data, error } = await supabase
  .from('user')
  .select('*');

  console.log(data, error);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {data?.map((user, i) => <div key={i}>{user.name}</div>)}
    </div>
  );
}
