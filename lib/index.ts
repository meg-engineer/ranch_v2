// Types
type Identifier = "M" | "T" | "O" | "S" | "K";

interface IAuthorInfo {}
interface IMagazineInfo {}

export async function getAllPost() {
  const users = ["_terada", "meg_t", "okimari", "soe92"];

  const posts = await Promise.all(
    users.map(async (user) => {
      const ENDPOINT = `https://note.com/api/v2/creators/${user}/contents?kind=note&page=1`;
      const response = await fetch(ENDPOINT);
      if (response.ok) {
        const {
          data: { contents },
        } = await response.json();
        const content = contents[0];

        return content;
      }
      return null;
    })
  );
  return posts;
}
