document.addEventListener("DOMContentLoaded", function () {
    var accordions = document.getElementsByClassName("accordion");
    for (var i = 0; i < accordions.length; i++) {
        accordions[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }

    var subAccordions = document.getElementsByClassName("sub-accordion");
    for (var j = 0; j < subAccordions.length; j++) {
        subAccordions[j].addEventListener("click", function () {
            this.classList.toggle("active");
            var subPanel = this.nextElementSibling;
            if (subPanel.style.display === "block") {
                subPanel.style.display = "none";
            } else {
                subPanel.style.display = "block";
            }
        });
    }
});
