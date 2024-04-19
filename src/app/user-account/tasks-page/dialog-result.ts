export interface DialogResult<T> {
    data?: T,
    action: 'Submit' | 'Cancel' | 'ClickOutside'
    isNew?: boolean
}