import React, { useEffect, useState } from "react";
import "./LessonDetails.scss";
import { useParams } from "react-router-dom";
const LessonDetails = () => {
    const allLessons = require('../../data/lesson.json')
    return (
        <div className="main details-section">
            <div className="container-lg">
                <div className="detail-box mb-5">
                    <h3>SQL</h3>
                    <div className="instructor">
                         <div className="box">
                            <h5>Tác giả</h5>
                            <p className="mb-0">hello</p>
                         </div>
                    </div>
                </div>
                <div className="row">
                    <div className="d-none d-sm-none d-md-block col-md-4 lessons">
                        <h3 className="mb-3">Tiến trình</h3>
                        <div></div>
                    </div>
                    <div className="col-12 col-md-8">
                        <h3 className="mb-3">Tên bài học</h3>
                        <div>
                        <p>
                        The following example shows how this can be done.

Step 1) Issue the update command

Step 2) Choose the condition which you want to use to decide which document needs to be updated. In our example, we want to update the document which has the Employee id 22.

Step 3) Use the set command to modify the Field Name

Step 4) Choose which Field Name you want to modify and enter the new value accordingly.

If the command is executed successfully, the following Output will be shown

Output:

MongoDB Update() Document

The output clearly shows that one record matched the condition and hence the relevant field value was modified.

Updating Multiple Values
To ensure that multiple/bulk documents are updated at the same time in MongoDB you need to use the multi option because otherwise by default only one document is modified at a time.

The following example shows how to update many documents.

In this example, we are going to first find the document which has the Employee id as “1” and change the Employee name from “Martin” to “NewMartin”

Step 1) Issue the update command

Step 2) Choose the condition which you want to use to decide which document needs to be updated. In our example, we want the document which has the Employee id of “1” to be updated.

Step 3) Choose which Field Name’s you want to modify and enter their new value accordingly.

db.Employee.update

If the command is executed successfully and if you run the “find” command to search for the document with Employee id as 22 you will see the following Output will be shown

Output:

MongoDB Update() Document

The output clearly shows that one record matched the condition and hence the relevant field value was modified.
                        </p>
                        </div>
                    <div class="change-lesson d-flex justify-content-between">
                        <button>Prev</button>
                        <button>Next</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LessonDetails