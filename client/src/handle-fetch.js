export const handleFetch = async (url, data = null, status = null) => {
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

    if (!response.ok && status && response.status === status) {
      return;
    } else if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
