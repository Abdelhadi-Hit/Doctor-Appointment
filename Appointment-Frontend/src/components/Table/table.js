import "./table.css";

const Table = () => {
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Article Name</th>
                  <th scope="col">Author</th>
                  <th scope="col">Shares</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Bootstrap 4 CDN and Starter Template</td>
                  <td>Cristina</td>
                  <td>2.846</td>
                  <td>
                    <button
                      style={{ marginLeft: "1rem" }}
                      type="button"
                      class="btn btn-danger"
                    >
                      Cancel
                    </button>
                    {false && (
                      <button
                        style={{ marginLeft: "1rem" }}
                        type="button"
                        class="btn btn-success"
                      >
                        Confirm
                      </button>
                    )}

                    <button
                      style={{ marginLeft: "1rem" }}
                      type="button"
                      class="btn btn-success"
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
