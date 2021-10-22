const json_contents = () => {
  const get_file = new XMLHttpRequest();
  get_file.open("GET", "../../data.json", false);
  get_file.send(null);

  const response = JSON.parse(get_file.responseText);
  return response;
};

const timeframe_title = ({ text }) => {
  const new_title = document.createElement("h4");
  new_title.innerText = text;
  return new_title;
};

const menu_icon = () => {
  const img = document.createElement("img");
  img.classList.add("card-icon");
  return (img.src = "../../assets/images/icon-ellipsis.svg");
};

const timeframe_current = ({ text }) => {
  const new_timeframe_current = document.createElement("h2");
  new_timeframe_current.innerText = `${text}hrs`;
  return new_timeframe_current;
};

const timeframe_previous = ({ text }) => {
  const new_timeframe_previous = document.createElement("p");
  new_timeframe_previous.innerText = `Last Week - ${text}hrs`;
  return new_timeframe_previous;
};

const timeframe_container = ({ current, previous }) => {
  const div = document.createElement("div");
  div.classList.add("card-description");
  div.append(
    timeframe_current({ text: current }),
    timeframe_previous({ text: previous })
  );
  return div;
};

const card_title = ({ title }) => {
  const div = document.createElement("div");
  div.classList.add("card-title");
  const img = document.createElement("img");
  img.src = "../../assets/images/icon-ellipsis.svg";
  img.alt = "ellipsis icon three dots";
  div.append(timeframe_title({ text: title }), img);
  return div;
};

const card_content = ({ title, current, previous }) => {
  const div = document.createElement("div");
  div.classList.add("card-content");
  const c_title = card_title({ title });
  const c_description = timeframe_container({ current, previous });
  div.append(c_title, c_description);
  return div;
};

const card_header = ({ color, icon }) => {
  const div = document.createElement("div");
  div.classList.add("card-header");
  div.style.backgroundColor = color;
  const img = document.createElement("img");
  img.src = `../../assets/images/icon-${icon}.svg`;
  img.classList.add("card-icon");
  div.append(img);
  return div;
};

const render_contents = () => {
  const contents = json_contents();
  const cards_list = document.querySelector("#cards-list");
  contents.map((content) => {
    const li = document.createElement("li");
    li.classList.add("card-container");
    const previous = content.timeframes.daily.previous;
    const current = content.timeframes.daily.current;
    const title =
      content.title.toLowerCase() == "self care"
        ? "self-care"
        : content.title.toLowerCase();
    const color = getComputedStyle(document.documentElement).getPropertyValue(
      `--primary-${title}`
    );
    li.append(
      card_header({ color, icon: title }),
      card_content({ title: content.title, previous, current })
    );

    cards_list.appendChild(li);
  });
};

render_contents();
