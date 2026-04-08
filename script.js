document.addEventListener("DOMContentLoaded", () => {
  const profileInput = document.getElementById("profile-input");
  const submintBtn = document.getElementById("submit");
  const resultText = document.getElementById("result-text");
  const resultPicture = document.getElementById("pic");

  profileInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submintBtn.click();
  });
  submintBtn.addEventListener("click", async () => {
    resultText.innerHTML = ``;
    resultPicture.innerHTML = ``;
    const inputText = profileInput.value.trim();
    console.log(inputText);

    if (inputText === "") {
      resultText.textContent = `Please Enter some value`;
      return;
    }
    try {
      resultText.textContent = "Searching....";
      const read = await fecthData(inputText);
      display(read);
      console.log(read);
    } catch (error) {
      resultText.textContent = `oops! user not found`;
    }
    profileInput.value = "";
  });

  async function fecthData(inputText) {
    const url = `https://api.github.com/users/${inputText}`;
    const respond = await fetch(url);
    if (!respond.ok) {
      throw new Error("User not found");
      return;
    }
    const data = await respond.json();
    // console.log(data);
    return data;
  }
  function display(read) {
    const {
      avatar_url,
      bio,
      public_repos,
      location: userLocation,
      html_url,
      name,
      followers,
      following,
    } = read;
    resultPicture.innerHTML = `
    <img src='${avatar_url}'></img>
    `;
    resultText.innerHTML = `Name: ${name}<br> 
    Bio: ${bio}<br>
    Followers: ${followers}<br>
    Following: ${following}<br>
    Public Repos: ${public_repos}<br>
    Location: ${userLocation || "Location Not found"}<br>
    <a href="${html_url}">Visit Profile</a>
    `;
  }
});

/* Todo
clear input
descriptive result
show load state
error handling
*/
