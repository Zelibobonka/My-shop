import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://lvvbxtmqhevwljohtdec.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dmJ4dG1xaGV2d2xqb2h0ZGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMDg0MDMsImV4cCI6MjA0Njg4NDQwM30.-XZoq6q65X7-dTwxLqStIokeWS5NsPfs9qOtPaqD_94";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
