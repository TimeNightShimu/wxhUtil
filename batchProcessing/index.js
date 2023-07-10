//批处理模板
function batchProcessing() {
    const batchSize = 500; // 每批请求的数量
    let currentIndex = 0; // 当前处理的索引
    let successCount = 0; // 成功请求的计数器
    let batchTime = 1000; //每一批的时间
    let youData = [true,false];//传入你需要进行分批处理的数据
    function batches() {
        const nowBatchData = youData.slice(currentIndex, currentIndex + batchSize);
        const promises = nowBatchData.map((index) => {
            return new Promise((resolve, reject) => {
                //对数组中的每个数据进行需要的处理;
                if (index) {
                    console.log("成功");
                    // 处理成功后标记请求成功，标记 Promise 状态为 resolved
                    resolve(); 
                }else {
                    console.log("Error:", error);
                    // 处理失败，标记 Promise 状态为 rejected
                    reject(error); 
                }
            });
        });
        Promise.all(promises)
        .then(function() {
            successCount += promises.length; // 增加成功请求的计数器
            if (currentIndex + batchSize >= youData.length) {
                if (successCount === youData.length) {
                    //所有数组处理完成后触发的
                    batchProcessingDown();
                } else {
                    console.log("某部分请求失败");
                }
            } else {
              setTimeout(function() {
                currentIndex += batchSize;
                batches();
            }, batchTime);
          }
        })
        .catch(function(error) {
            console.log("Error:", error);
        });
    }

    function batchProcessingDown() {
             //所有数据处理完成后触发
       console.log("处理完成");
    }

    // 开始发送第一批请求
    batches();
}
