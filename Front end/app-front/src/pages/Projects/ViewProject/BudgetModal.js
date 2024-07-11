export default function BudgetModal({ isOpen, onClose, budgetConsumptions }) {
    if (!isOpen) return null;
   
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          
          <span className="modal-close-button" onClick={onClose}><i className=" fa-sharp fa-solid fa-circle-xmark"></i></span>
          <h4 className="my-3">Details du Budget Consomme</h4>
          <div className="form-box-modal">
                  <div className="flex-container">
                    <div className="profile-right">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Montant</th>
                <th>Commentaire</th>
              </tr>
            </thead>
            <tbody>
              {budgetConsumptions.map((consumption, index) => (
                <tr key={index}>
                  <td>{new Date(consumption.date).toLocaleDateString()}</td>
                  <td>{consumption.amount} MAD</td>
                  <td>{consumption.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
          </div>
        </div>
      </div>
    );
   }
   