﻿/*
This file is part of Natural Docs, which is Copyright © 2003-2020 Code Clear LLC.
Natural Docs is licensed under version 3 of the GNU Affero General Public
License (AGPL).  Refer to License.txt or www.naturaldocs.org for the
complete details.

This file may be distributed with documentation files generated by Natural Docs.
Such documentation is not covered by Natural Docs' copyright and licensing,
and may have its own copyright and distribution terms as decided by its author.
*/

"use strict";var NDContentPage=new function(){this.Start=function(){var ieVersion=NDCore.IEVersion();if(ieVersion==undefined||ieVersion>=8){this.CalculateWideFormPrototypeWidths();for(var key in this.wideFormPrototypeWidths){if(this.wideFormPrototypeWidths[key]==0){setTimeout("NDContentPage.Start();",200);return;}}this.ReformatPrototypes();window.onresize=function(){NDContentPage.OnResize();}}this.toolTipHolder=document.createElement("div");this.toolTipHolder.style.display="none";this.toolTipHolder.style.position="fixed";if(ieVersion==6){this.toolTipHolder.style.position="absolute";}this.toolTipHolder.style.zIndex=20;document.body.appendChild(this.toolTipHolder);var ttLocation=location.href;var hashIndex=ttLocation.indexOf('#');if(hashIndex!=-1){ttLocation=ttLocation.substr(0,hashIndex);}ttLocation=ttLocation.substr(0,ttLocation.length-5)+"-ToolTips.js";NDCore.LoadJavaScript(ttLocation);};this.OnResize=function(){if(this.reformatPrototypesTimeout==undefined){this.reformatPrototypesTimeout=setTimeout("NDContentPage.ReformatPrototypes()",200);}};this.GetPrototypeIDNumber=function(element){if(element.id.indexOf("NDPrototype")==0){var id=parseInt(element.id.substr(11),10);if(id!=NaN&&id>0){return id;}}return-1;};this.CalculateWideFormPrototypeWidths=function(){var prototypes=NDCore.GetElementsByClassName(document,"NDPrototype","div");for(var i=0;i<prototypes.length;i++){if(NDCore.HasClass(prototypes[i],"WideForm")){var id=this.GetPrototypeIDNumber(prototypes[i]);if(id!=-1){var tables=prototypes[i].getElementsByTagName("table");var maxWidth=0;for(var t=0;t<tables.length;t++){var tableWidth=tables[t].offsetWidth;if(tableWidth>maxWidth){maxWidth=tableWidth;}}this.wideFormPrototypeWidths[id]=maxWidth;}}}};this.ReformatPrototypes=function(){var prototypes=NDCore.GetElementsByClassName(document,"NDPrototype","div");for(var i=0;i<prototypes.length;i++){var id=this.GetPrototypeIDNumber(prototypes[i]);if(id==-1){continue;}var wideFormWidth=this.wideFormPrototypeWidths[id];if(wideFormWidth==null||wideFormWidth<=0){continue;}var availableWidth=prototypes[i].offsetWidth;availableWidth-=(prototypes[i].firstChild.offsetLeft-prototypes[i].offsetLeft)*2;availableWidth--;if(availableWidth>=wideFormWidth&&NDCore.HasClass(prototypes[i],"NarrowForm")){NDCore.ChangePrototypeToWideForm(prototypes[i]);}else if(availableWidth<wideFormWidth&&NDCore.HasClass(prototypes[i],"WideForm")){NDCore.ChangePrototypeToNarrowForm(prototypes[i]);}}if(this.reformatPrototypesTimeout!=undefined){clearTimeout(this.reformatPrototypesTimeout);this.reformatPrototypesTimeout=undefined;}};this.ShowAdditionalChildren=function(prototypeID){var prototype=document.getElementById(prototypeID);var notice=NDCore.GetElementsByClassName(prototype,"CPAdditionalChildrenNotice","a")[0];var additionalChildren=NDCore.GetElementsByClassName(prototype,"CPAdditionalChildren","div")[0];notice.style.display="none";additionalChildren.style.display="block";};this.OnToolTipsLoaded=function(toolTips){this.toolTips=toolTips;if(this.showingToolTip!=undefined&&this.toolTips[this.showingToolTip]!=undefined){this.ShowToolTip();}};this.OnLinkMouseOver=function(event,toolTipID){var domLink=event.target||event.srcElement;if(this.showingToolTip!=toolTipID){this.ResetToolTip();this.showingToolTip=toolTipID;this.domLinkShowingToolTip=domLink;if(this.toolTips==undefined){}else if(this.toolTips[toolTipID]!=undefined){this.toolTipTimeout=setTimeout(function(){clearTimeout(this.toolTipTimeout);this.toolTipTimeout=undefined;NDContentPage.ShowToolTip();},350);}}};this.OnLinkMouseOut=function(event){var domLink=event.target||event.srcElement;if(this.domLinkShowingToolTip==domLink){this.ResetToolTip();}};this.ShowToolTip=function(){if(NDCore.IsIE()&&NDCore.IEVersion()<7){return;}this.toolTipHolder.innerHTML=this.toolTips[this.showingToolTip];this.toolTipHolder.style.visibility="hidden";this.toolTipHolder.style.display="block";NDCore.SetToAbsolutePosition(this.toolTipHolder,0,undefined,undefined,undefined);var scrollParent=document.body;if(scrollParent.scrollTop==0){scrollParent=scrollParent.parentNode;}var linkOffsets=NDCore.GetFullOffsets(this.domLinkShowingToolTip);var x=linkOffsets.offsetLeft;var y=linkOffsets.offsetTop+this.domLinkShowingToolTip.offsetHeight-scrollParent.scrollTop+5;var newWidth=undefined;if(x+this.toolTipHolder.offsetWidth+2>document.body.offsetWidth){x=document.body.offsetWidth-this.toolTipHolder.offsetWidth-2;if(x<2){x=2;newWidth=document.body.offsetWidth-4;}}NDCore.SetToAbsolutePosition(this.toolTipHolder,x,y,newWidth,undefined);var prototypes=NDCore.GetElementsByClassName(this.toolTipHolder,"NDPrototype","div");if(prototypes.length>0&&NDCore.HasClass(prototypes[0],"WideForm")&&prototypes[0].scrollWidth>prototypes[0].offsetWidth){NDCore.ChangePrototypeToNarrowForm(prototypes[0]);}if(y+this.toolTipHolder.offsetHeight+2>document.body.parentNode.offsetHeight){var newY=linkOffsets.offsetTop-this.toolTipHolder.offsetHeight-scrollParent.scrollTop-5;if(newY>=0){NDCore.SetToAbsolutePosition(this.toolTipHolder,undefined,newY,undefined,undefined);}}this.toolTipHolder.style.visibility="visible";};this.ResetToolTip=function(){if(this.showingToolTip!=undefined){this.toolTipHolder.style.display="none";this.toolTipHolder.style.width=null;this.lastToolTip=this.showingToolTip;this.showingToolTip=undefined;}if(this.toolTipTimeout!=undefined){clearTimeout(this.toolTipTimeout);this.toolTipTimeout=undefined;}};this.wideFormPrototypeWidths={};};