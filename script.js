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

    if (inputText === "") {
      resultText.textContent = `Please Enter some value`;
      return;
    }
    try {
      resultText.textContent = "Searching....";
      const read = await fecthData(inputText);
      display(read);
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
    }
    const data = await respond.json();
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
    resultText.textContent = "";
    resultPicture.innerHTML = `
    <img src='${avatar_url}'></img>
    `;
    let nameP = document.createElement("p");
    nameP.textContent = `Name: ${name}`;
    resultText.appendChild(nameP);
    let bioP = document.createElement("p");
    bioP.textContent = `Bio: ${bio || "Not found"}`;
    resultText.appendChild(bioP);
    let follP = document.createElement("p");
    follP.textContent = `Followers ${followers} Following ${following}`;
    resultText.appendChild(follP);
    let publicRepo = document.createElement("p");
    publicRepo.textContent = `No. of Public Repo: ${public_repos}`;
    resultText.appendChild(publicRepo);
    let locationP = document.createElement("p");
    locationP.textContent = `Location: ${userLocation || "Not found"}`;
    resultText.appendChild(locationP);
    let link = document.createElement("p");
    link.innerHTML = `<a href="${html_url}">Visit Profile</a>`;
    resultText.appendChild(link);
  }
});
