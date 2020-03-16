export const handleFetch = async (url, data = null) => {
  try {
    let response;

    if (data) {
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    } else {
      response = await fetch(url);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
