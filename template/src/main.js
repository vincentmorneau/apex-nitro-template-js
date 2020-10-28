import p1 from "./js/p1";
import p2 from "./js/p2";

export {
  p1,
  p2
};

apex.jQuery(document).ready(() => {
  if (document.getElementById("pFlowStepId").value === "1") p1.init();
  if (document.getElementById("pFlowStepId").value === "2") p2.init();
});
