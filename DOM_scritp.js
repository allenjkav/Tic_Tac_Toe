function checkWinner(direction,col,row,cell)
{
let winner_flag=true;
function scanCell(ele) {
    if (ele.innerText!==next)
    {
    winner_flag=false;
    }
}
function blinkifWon(ele)
{
ele.querySelector("strong").setAttribute("class","blinker");
}
if (direction==="h")
{cells=document.querySelector(".row:nth-child("+(row+2)+")").querySelectorAll(".col-lg-4");
cells.forEach(scanCell);
if (winner_flag)
{
    cells.forEach(blinkifWon);
}}
else if (direction==="v")
{cells=document.querySelectorAll(".col-lg-4:nth-child("+(col+1)+")");
cells.forEach(scanCell);
if (winner_flag)
{
    cells.forEach(blinkifWon);
}}
else
{
    let l2r=[];
    let r2l=[];
    let l2rflag=true;
    let r2lflag=true;
    function l2rDiagonal(){
    for (let i=0;i<3;i++)
    {
    l2r.push(document.querySelector(".row:nth-child("+(i+2)+")").querySelector(".col-lg-4:nth-child("+(i+1)+")"));
    }
    l2r.forEach(scanCell);
    l2rflag=winner_flag;
    }
    function r2lDiagonal(){
    let k=3;
    for (let i=0;i<3;i++)
    {
    r2l.push(document.querySelector(".row:nth-child("+(i+2)+")").querySelector(".col-lg-4:nth-child("+(i+k)+")"));
    k-=2
    }
    r2l.forEach(scanCell);
    r2lflag=winner_flag;
    }
    if (col===row && cornerCells.includes(cell))
    {
    l2rDiagonal();
    if (l2rflag)
    {
    l2r.forEach(blinkifWon);
    }
    }
    else if (col!==row && cornerCells.includes(cell))
    {
    r2lDiagonal();
    if (r2lflag)
    {
    r2l.forEach(blinkifWon);
    }
    }
    else
    {
    l2rDiagonal();
    r2lDiagonal();
    if (l2rflag)
    {
        l2r.forEach(blinkifWon);
    }
    else if(r2lflag)
    {
        r2l.forEach(blinkifWon);
    }
    }
}
}
function RemoveEditStatus(cell,col,row)
{
    col.setAttribute("style","pointer-events:none");
    let disall=document.querySelectorAll("[style*='pointer-events:none']").length;
    if (disall%2!==0)
    {
        col.setAttribute("style","pointer-events:none;color:red");
        next="O";
    }
    else
    {
        col.setAttribute("style","pointer-events:none;color:green");
        next="X";
    }

}
function Restart()
{
allSquare=document.querySelectorAll(".col-lg-4")
for (let i=0;i<allSquare.length;i++)
{
    strong=allSquare[i].querySelector("strong");
    strong.innerText="";
    strong.removeAttribute("class");
    allSquare[i].removeAttribute("style");

}
next="X";
}
let cornerCells=[1,3,7,9];
let counter=0;
let next="X";
let btRefresh=document.querySelector("#btRefresh")
btRefresh.addEventListener("click",Restart);
let rows=document.querySelectorAll(".row");
for(let r=0;r<rows.length;r++)
{
let cols=rows[r].querySelectorAll(".col-lg-4");
for(let i=0;i<cols.length;i++)
{
let strong=cols[i].querySelector("strong");
cols[i].addEventListener("click",function(){
let val=strong.innerText;
if (val==="" && next==="X")
{
counter+=1;
strong.innerText="X";}
else if (val==="" && next==="O")
{
counter+=1
strong.innerText="O";}
else
{
counter-=1;
strong.innerText="";
}
let cell=(r*3)+(i+1);
if (counter>=5)
{
checkWinner("h",i,r);//horizontal
checkWinner("v",i,r);//vertical
if (cell%2!==0)
{
checkWinner("d",i,r,cell);//diagonal
}
}
cols[i].addEventListener("mouseleave",function()
{
if (cols[i].innerText)
{
RemoveEditStatus(cell,cols[i],rows[r]);
}})
})
}
}