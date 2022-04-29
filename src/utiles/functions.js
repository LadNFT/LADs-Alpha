export const goToLinkOutside = (link) => {
  window.open(link, "_blank");
}

export const goToSection = (sectionID) => {
  const anchor = document.querySelector(`#${sectionID}`)
  anchor.scrollIntoView({ behavior: 'smooth' })
}