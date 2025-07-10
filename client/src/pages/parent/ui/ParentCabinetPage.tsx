import React, { useEffect, useState, startTransition } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import {
  getMyParentProfile,
  createParentProfile,
  updateParentProfile,
  deleteParentProfile,
} from '@/entities/parent/model/parentThunks';
import {
  updateChildrenLocally,
  updateContactInfoLocally,
} from '@/entities/parent/model/parentSlice';
import type { ChildType, NewParentType } from '@/entities/parent/model/parentTypes';
import parentService from '@/entities/parent/api/parentService';
import ContactInfoForm from '@/features/parent/contactInfo/ui/ContactInfoForm';
import ChildCard from '@/features/parent/childCard/ui/ChildCard';
import MyRequests from '@/features/parent/myRequests/ui/MyRequests';
import { getMyRequests } from '@/entities/request/model/requestThunks';
import './ParentCabinetPage.css';

export default function ParentCabinetPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const parent = useAppSelector((state) => state.parent.parent);
  const loading = useAppSelector((state) => state.parent.loading);

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [newChildFormVisible, setNewChildFormVisible] = useState(false);
  const [newChildData, setNewChildData] = useState<ChildType>({ name: '', age: '' });

  useEffect(() => {
    void dispatch(getMyParentProfile());
    void dispatch(getMyRequests());
  }, [dispatch]);

  const handleCreate = async (data: NewParentType) => {
    await dispatch(createParentProfile(data));
  };

  const handleUpdateContact = async ({ phone, adress }: { phone: string; adress: string }) => {
    if (!parent?.id) return;
    startTransition(() => {
      dispatch(updateContactInfoLocally({ phone, adress }));
    });
    await dispatch(updateParentProfile({ id: parent.id, data: { ...parent, phone, adress } }));
    setIsEditingContact(false);
  };

  const handleAddChild = () => {
    setNewChildFormVisible(true);
  };

  const handleSaveNewChild = async () => {
    if (!parent?.id) return;
    const updatedChildren = [...(parent.children ?? []), newChildData];

    startTransition(() => {
      dispatch(updateChildrenLocally(updatedChildren));
    });

    await parentService.addChild(parent.id, newChildData);
    setNewChildFormVisible(false);
    setNewChildData({ name: '', age: '' });
  };

  const handleCancelNewChild = () => {
    setNewChildFormVisible(false);
    setNewChildData({ name: '', age: '' });
  };

  const handleUpdateChild = async (index: number, updated: ChildType) => {
    if (!parent?.id) return;
    const newChildren = [...(parent.children ?? [])];
    newChildren[index] = updated;

    startTransition(() => {
      dispatch(updateChildrenLocally(newChildren));
    });

    await parentService.updateChild(parent.id, index, updated);
  };

  const handleDeleteChild = async (index: number) => {
    if (!parent?.id) return;
    const newChildren = parent.children?.filter((_, i) => i !== index) ?? [];

    startTransition(() => {
      dispatch(updateChildrenLocally(newChildren));
    });

    await parentService.deleteChild(parent.id, index);
  };

  const handleDeleteProfile = async () => {
    if (!parent?.id) return;
    await dispatch(deleteParentProfile(parent.id));
  };

  if (loading) return <p>Загрузка...</p>;

  if (!parent) {
    return (
      <div className="parentCabinetContainer">
        <div className="parentSection">
          <h2>Создание профиля родителя</h2>
          <ContactInfoForm
            onSubmit={({ phone, adress }) => handleCreate({ phone, adress, children: [] })}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="parentCabinetContainer">
      <div className="parentSection">
        <h2>Ваш профиль</h2>
        {isEditingContact ? (
          <ContactInfoForm
            initialPhone={parent.phone ?? ''}
            initialAdress={parent.adress ?? ''}
            onSubmit={handleUpdateContact}
          />
        ) : (
          <>
            <p><strong>Телефон:</strong> {parent.phone || 'Не указано'}</p>
            <p><strong>Адрес:</strong> {parent.adress || 'Не указано'}</p>
            <button onClick={() => setIsEditingContact(true)}>Редактировать контакты</button>
          </>
        )}
      </div>

      <div className="parentSection">
        <h3>Дети</h3>
        {parent.children?.map((child, index) => (
          <ChildCard
            key={index}
            index={index}
            child={child}
            onUpdate={handleUpdateChild}
            onDelete={handleDeleteChild}
          />
        ))}

        {newChildFormVisible ? (
          <div className="addChildInputs">
            <input
              type="text"
              placeholder="Имя"
              value={newChildData.name}
              onChange={(e) => setNewChildData({ ...newChildData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Возраст"
              value={newChildData.age}
              onChange={(e) => setNewChildData({ ...newChildData, age: e.target.value })}
            />
            <button onClick={handleSaveNewChild}>Сохранить</button>
            <button onClick={handleCancelNewChild}>Отмена</button>
          </div>
        ) : (
          <button onClick={handleAddChild}>Добавить ребёнка</button>
        )}
      </div>

      <div className="parentSection">
        <h3>Ваши заявки</h3>
        <MyRequests />
      </div>

      <div className="parentSection">
        <button onClick={handleDeleteProfile} style={{ color: 'red' }}>
          Очистить профиль
        </button>
      </div>
    </div>
  );
}
