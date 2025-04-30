import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types'; // Import your types

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL and key must be defined in environment variables.');
    }
    export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

let parkURL = window.location.href

let parkName = supabase_query("SELECT name FROM park WHERE " + parkURL + " = park.link_url")  // Get park name from URL and map to UUID
let parkUUID = supabase_query("SELECT park FROM park WHERE " + parkName + " = name")

let username = this.Authorization.username
let userUUID = supabase_query("SELECT user FROM user WHERE " + username + " = name")  // Get username and map to UUID

let savedTime = Date.now() // Gets the current time 

supabase_query("INSERT INTO saved_park(" + userUUID , parkUUID , savedTime + ")")  // Saves the park by inserting row into database