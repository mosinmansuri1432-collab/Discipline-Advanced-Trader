/*=========================================================
SUPABASE CLIENT
=========================================================*/

const SUPABASE_URL = "https://ydptzxaxjugukgwsaxno.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_26Xivy3RlKoy3IdrjUPV-g_wJufQKC0";

const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);