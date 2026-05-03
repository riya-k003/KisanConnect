export function validateTip(tipData){
    const title = tipData.title.trim();
    const category = tipData.category.trim();
    const content = tipData.content.trim();

    if(!title || !category || !content) return "All fields are required";
    if (/^\d+$/.test(title)) return "Title cannot contain only numbers";
  if (title.length < 3) return "Title must be at least 3 characters";
  if (content.length < 10) return "Content must be at least 10 characters";

  return null;
}