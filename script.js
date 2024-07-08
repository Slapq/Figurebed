function initCollapsible(tableContent, firstDirectory) {
    var coll = document.getElementsByClassName("collapsible");
    var imageTable = document.getElementById("image-table");

    function populateTable(directory) {
        while (imageTable.rows.length > 1) {
            imageTable.deleteRow(1);
        }
        if (tableContent[directory]) {
            tableContent[directory].forEach(function(item) {
                var row = imageTable.insertRow();
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = '<img src="' + item[1] + '" alt="' + item[0] + '">';
                cell2.innerHTML = '<span class="link" onclick="copyToClipboard(\'' + item[1] + '\')">' + item[1] + '</span>';
                cell3.innerHTML = '<span class="link" onclick="copyToClipboard(\'' + item[2] + '\')">' + item[2] + '</span>';
            });
        }
    }

    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            var active = document.querySelector('.collapsible.active');
            if (active && active !== this) {
                active.classList.remove('active');
                active.nextElementSibling.style.display = 'none';
            }
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
            populateTable(this.getAttribute("data-path"));
        });
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            alert('链接已复制: ' + text);
        }, function(err) {
            console.error('复制失败: ', err);
        });
    }

    // 默认展开第一个目录并显示其内容
    if (firstDirectory) {
        populateTable(firstDirectory);
        var firstCollapsible = document.querySelector('.collapsible[data-path="' + firstDirectory + '"]');
        firstCollapsible.classList.add("active");
        firstCollapsible.nextElementSibling.style.display = "block";
    }
}
document.addEventListener("DOMContentLoaded", function() {
    initCollapsible(tableContent, firstDirectory);
});
